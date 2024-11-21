'use client';

import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Show from '../elements/Show';
import { Avatar, AvatarImage } from '../ui/avatar';

export function UserNav() {
  const [open, setOpen] = useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="flex w-36 items-center gap-2">
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8 cursor-default">
              <AvatarImage
                src={'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=360'}
                alt={''}
              />
            </Avatar>
          </Button>
          <div className="flex cursor-default flex-col items-start justify-center">
            <p className="text-[0.875rem]">John Doe</p>
            <p className="text-[0.75rem] text-slate-800">Admin</p>
          </div>
          <Show when={open} fallback={<ChevronDown size={24} className="cursor-pointer" />}>
            <ChevronUp size={24} className="cursor-pointer" />
          </Show>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">name</p>
            <p className="text-xs leading-none text-muted-foreground">email</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator color="#9a3412" />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator color="#9a3412" />
        <DropdownMenuItem onClick={() => { }}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
