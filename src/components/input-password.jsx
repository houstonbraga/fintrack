import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const InputPassword = ({ placeholder = 'Digite sua senha' }) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)

  return (
    <div className="relative">
      <Input
        className="bg-transparent"
        type={isVisiblePassword ? 'text' : 'password'}
        placeholder={placeholder}
      />
      <Button
        type="button"
        variant="ghost"
        className="absolute bottom-0 right-0 top-0 my-auto h-9 w-9"
        onClick={() => setIsVisiblePassword((prev) => !prev)}
      >
        {isVisiblePassword ? (
          <EyeClosedIcon className="text-muted-foreground" />
        ) : (
          <EyeIcon className="text-muted-foreground" />
        )}
      </Button>
    </div>
  )
}

export default InputPassword
