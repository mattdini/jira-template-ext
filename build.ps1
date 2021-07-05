Get-ChildItem -Path * -Recurse -File -Exclude *.zip,*.ps1,*.bat | 
    Where-Object {$_.Directory -notmatch 'git' } |
    Compress-Archive -Force -DestinationPath firefox.zip