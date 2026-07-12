[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$gitExe = 'C:\Program Files\Git\cmd\git.exe'
$path = [System.IO.Path]::Combine('C:\Users\hinem\OneDrive', [char]0x30C7 + [char]0x30B9 + [char]0x30AF + [char]0x30C8 + [char]0x30C3 + [char]0x30D7, 'study', 'claude', 'combolith')
Set-Location -LiteralPath $path
& $gitExe init
& $gitExe branch -M main
& $gitExe config user.email 'hinemoz@users.noreply.github.com'
& $gitExe config user.name 'hinemoz'
& $gitExe add .
& $gitExe status --short
