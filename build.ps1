Get-ChildItem -Path * -Recurse -File -Exclude *.zip,*.ps1,*.bat | 
    Where-Object {$_.Directory -notmatch 'docs' } |
    Compress-Archive -Force -DestinationPath firefox.zip


Get-ChildItem -Path * -Recurse -File -Exclude *.zip,*.ps1,*.bat | 
    Where-Object {$_.Directory -notmatch 'docs' } |
    Compress-Archive -Force -DestinationPath chrome.zip