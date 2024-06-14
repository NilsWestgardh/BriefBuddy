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
import { UserProfileType } from "@/app/utils/types/UserProfileType";
// Utils
import { createClient } from "@/app/utils/supabase/client";
import clsx from "clsx";
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
import Tooltip from '@mui/material/Tooltip';
// Icons
import DeleteIcon from '@mui/icons-material/Delete';

const roles: { [key: string]: string } = {
  owner: "Owner",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
  guest: "Guest",
};

const status: { [key: string]: string } = {
  active: "Active",
  pending: "Pending",
};

const tableRowColumns = [
  "Name",
  "Role",
  "Joined",
  "Email",
  "Status",
  "Actions",
];

function stringToColor(string: string) {
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

function stringAvatar(name: string) {
  const initials = name
    .split(' ')
    .map(part => part[0])
    .join('');
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 32, // Reduced width
      height: 32, // Reduced height
    },
    children: initials,
  };
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
    const editableRoles = userRole === 'owner' ? ['owner', 'admin', 'editor', 'viewer', 'guest'] :
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
            size="small"
            className="w-full"
            onChange={(e) => handleRoleChange(
              member.user_id,
              e.target.value as string
            )}
          >
            {
              Object
                .keys(roles)
                .map(role => (
                  <MenuItem
                    key={role}
                    value={role}
                  >
                    {roles[role]}
                  </MenuItem>
                ))
            }
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
        {canRemoveMember(member.role.toLowerCase()) && (
          <IconButton onClick={() => handleRemoveMember(member.user_id)}>
            <>
              <Tooltip title="Remove member" arrow>
                <DeleteIcon />
              </Tooltip>
            </>
          </IconButton>
        )}
      </>
    );
  };

  useEffect(() => {
    if (!selectedTeam) return;

    async function fetchTeamMembers() {
      const { data: teamMembers, error: teamMembersError, } = await supabase
        .from('team_members')
        .select(`
          id,
          created_at,
          updated_at,
          team_id,
          user_id,
          role,
          status,
          users ( id, created_at, updated_at, first_name, last_name, email, avatar_url, status )
        `)
        .eq(
          'team_id',
          selectedTeam?.id
        );

      if (teamMembersError) {
        console.error(
          'Error fetching team members:',
          teamMembersError
        );
      } else if (teamMembers) {
        const mappedData: TeamMemberType[] = teamMembers.map((item) => ({
          ...item,
          users: item.users as unknown as UserProfileType,
        }));
        setTeamMembers(mappedData);
      }
    }

    async function fetchUserRole() {
      const { data: userRole, error: userError } = await supabase
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
      } else if (userRole) {
        setUserRole(userRole.role);
      };
    };

    fetchTeamMembers();
    fetchUserRole();
  }, [
    selectedTeam,
    supabase,
    user
  ]);

  return (
    <TableContainer
      className="flex flex-col justify-start items-start border border-neutral-300 rounded-lg w-full overflow-hidden"
    >
      <Table
        aria-label="team table"
        className="w-full table-fixed"
      >
        <TableHead className="bg-neutral-50">
          <TableRow>
            {tableRowColumns.map((column, index) => (
              <TableCell
                key={index}
                className="font-semibold truncate"
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {teamMembers.map((member) => (
            <TableRow
              key={member.user_id}
              className="last:border-0"
            >
              {/* MEMBER: AVATAR + NAME */}
              <TableCell
                component="th"
                scope="row"
                className="flex flex-row justify-start items-center gap-4 truncate mt-1"
                sx={{ borderBottom: 'none' }}
              >
                {member.users?.avatar_url ? (
                  <Avatar
                    sx={{ width: 32, height: 32 }} // Reduced width and height
                    src={member.users.avatar_url}
                  />
                ) : (
                  <Avatar {...stringAvatar(`${member.users.first_name} ${member.users.last_name}`)} />
                )}
                <span className="truncate">{member.users?.first_name} {member.users?.last_name}</span>
              </TableCell>
              {/* MEMBER: ROLE */}
              <TableCell className="truncate">
                {renderRoleControls(member)}
              </TableCell>
              {/* MEMBER: JOINED */}
              <TableCell className="truncate">
                <Typography variant="body2">
                  {new Date(member.created_at).toLocaleDateString()}
                </Typography>
              </TableCell>
              {/* MEMBER: EMAIL */}
              <TableCell className="truncate">
                <Typography variant="body2">
                  {member.users.email}
                </Typography>
              </TableCell>
              {/* MEMBER: STATUS */}
              <TableCell className="truncate">
                <Typography
                  variant="body2"
                  // className={statusColors[member.status]}
                  className={clsx("flex px-2 py-1 rounded-md", {
                    "text-green-700 bg-green-50": member.status.toLowerCase() === "active",
                    "text-red-700 bg-red-50": member.status.toLowerCase() === "pending",
                  })}
                >
                  {member.status !== 'Active' ? 'Pending' : status[member.status]}
                </Typography>
              </TableCell>
              {/* MEMBER: ACTIONS */}
              {member.role.toLowerCase() !== "owner" ? (
                <TableCell className="truncate">
                  {renderRemoveButton(member)}
                </TableCell>
              ) : (
                <TableCell className="truncate">
                  <Tooltip title="Team owner can't remove themselves.">
                    <Typography variant="body2">N/A</Typography>
                  </Tooltip>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
