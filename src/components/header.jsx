import { LogOutIcon } from 'lucide-react'
import { useCallback } from 'react'

import logo from '@/assets/Logo.svg'
import { useAuthContext } from '@/contexts/auth'

import { Avatar, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

const Header = () => {
  const { user, signout } = useAuthContext()

  const getFirstLetters = useCallback((firstName, lastName) => {
    const name = `${firstName} ${lastName}`
    const initials = name
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase()
    return initials
  }, [])

  return (
    <header className="sticky flex h-[72px] items-center justify-between border-b border-b-muted bg-card px-12">
      <div>
        <img src={logo} alt="logo-icon" />
      </div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback>
                  {getFirstLetters(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
              {user.firstName} {user.lastName}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col justify-center">
            <DropdownMenuLabel>Meu perfil</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                size="small"
                variant="ghost"
                className="w-full justify-start"
                onClick={signout}
              >
                <LogOutIcon />
                Sair
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
