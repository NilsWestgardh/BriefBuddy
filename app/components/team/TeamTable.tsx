"use client";

// Hooks
import React, { 
  useEffect, 
  useState 
} from "react";
import { useTeam } from "@/app/contexts/TeamContext";
import { useUser } from "@/app/contexts/UserContext";
// Types
import { TeamMemberType } from "@/app/utils/types/TeamMemberType";
// Utils
import { createClient } from "@/app/utils/supabase/client";
// Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// Icons
import DeleteIcon from '@mui/icons-material/Delete';

const roles = {
  owner: "Owner",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
  guest: "Guest",
};

const statusColors = {
  Active: "text-green-700",
  Pending: "text-red-700",
};

export default function TeamTable() {
  const { user } = useUser();
  const { selectedTeam } = useTeam();
  const supabase = createClient();
  const [teamMembers, setTeamMembers] = useState<TeamMemberType[]>([]);
  const [userRole, setUserRole] = useState<string>("");

  async function handleRoleChange(userId: string, newRole: string) {
    const { error } = await supabase
      .from('team_members')
      .update({ role: newRole })
      .eq('team_id', selectedTeam?.id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating role:', error);
    } else {
      setTeamMembers(teamMembers.map(member => 
        member.user_id === userId ? { ...member, role: newRole } : member
      ));
    }
  };

  async function handleRemoveMember(userId: string) {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('team_id', selectedTeam?.id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error removing member:', error);
    } else {
      setTeamMembers(teamMembers.filter(member => member.user_id !== userId));
    }
  };

  function canEditRole(role: string) {
    const editableRoles = userRole === 'owner' ? ['admin', 'editor', 'viewer', 'guest'] : 
                          userRole === 'admin' ? ['editor', 'viewer', 'guest'] : [];
    return editableRoles.includes(role);
  };

  function canRemoveMember(role: string) {
    const removableRoles = userRole === 'owner' ? ['admin', 'editor', 'viewer', 'guest'] : 
                           userRole === 'admin' ? ['editor', 'viewer', 'guest'] : [];
    return removableRoles.includes(role);
  };

  function renderRoleControls(member: TeamMemberType) {
    return (
      <>
        {canEditRole(member.role) ? (
          <Select
            value={member.role}
            onChange={(e) => handleRoleChange(member.user_id, e.target.value as string)}
          >
            {Object.keys(roles).map(role => (
              <MenuItem key={role} value={role}>{roles[role]}</MenuItem>
            ))}
          </Select>
        ) : (
          roles[member.role]
        )}
      </>
    );
  }

  function renderRemoveButton(member: TeamMemberType) {
    return (
      <>
        {canRemoveMember(member.role) && (
          <IconButton onClick={() => handleRemoveMember(member.user_id)}>
            <DeleteIcon />
          </IconButton>
        )}
      </>
    );
  }

  // Fetch team members & roles
  useEffect(() => {
    if (!selectedTeam) return;

    async function fetchTeamMembers() {
      const { 
        data, 
        error 
      } = await supabase
        .from('team_members')
        .select(`
          user_id,
          role,
          status,
          users ( name, avatar_url )
        `)
        .eq(
          'team_id', 
          selectedTeam?.id
        );

      if (error) {
        console.error(
          'Error fetching team members:', 
          error
        );
      } else {
        setTeamMembers(data);
      }
    }

    async function fetchUserRole() {
      const { 
        data: userData, 
        error: userError 
      } = await supabase
        .from('team_members')
        .select('role')
        .eq('team_id', selectedTeam?.id)
        .eq('user_id', user?.id)
        .single();

      if (userError) {
        console.error(
          'Error fetching user role:',
           userError
        );
      } else {
        setUserRole(userData.role);
      }
    }

    fetchTeamMembers();
    fetchUserRole();
  }, [
    selectedTeam, 
    supabase,
    user
  ]);

  return (
    <TableContainer
      className="
        border
        border-neutral-300
        rounded-md
        w-full
      "
    >
      <Table
        aria-label="team table"
      >
        <TableHead
          className="bg-neutral-50"
        >
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow
              key={member.user_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                className="
                  flex
                  flex-row
                  justify-start
                  items-center
                  gap-4
                "
              >
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  src={member.users.avatar_url}
                >
                  {member.users.name[0]}
                </Avatar>
                {member.users.name}
              </TableCell>
              <TableCell>
                {renderRoleControls(member)}
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  className={statusColors[member.status]}
                >
                  {member.status}
                </Typography>
              </TableCell>
              <TableCell>
                {renderRemoveButton(member)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};