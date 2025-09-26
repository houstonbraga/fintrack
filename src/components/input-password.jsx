import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'

const InputPassword = forwardRef(
  ({ placeholder = 'Digite sua senha', ...rest }, ref) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)

    return (
      <div className="relative">
        <Input
          className="bg-transparent"
          type={isVisiblePassword ? 'text' : 'password'}
          placeholder={placeholder}
          ref={ref}
          {...rest}
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
)

InputPassword.displayName = 'InputPassword'

export default InputPassword
