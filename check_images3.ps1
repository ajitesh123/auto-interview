$mdxFiles = Get-ChildItem -Path d:\auto-interview\data\blog -Filter *.mdx
foreach ($file in $mdxFiles) {
    if ((Get-Date) - $file.LastWriteTime -lt (New-TimeSpan -Days 5)) {
        $content = Get-Content $file.FullName
        $imageLine = $content | Select-String -Pattern "^images:\s*\[\s*'(.*?)'\s*\]"
        if ($imageLine) {
            $imgPath = $imageLine.Matches[0].Groups[1].Value
            $localPath = "d:\auto-interview\public" + $imgPath.Replace('/', '\')
            if (-not (Test-Path $localPath)) {
                Write-Host "$($file.Name),$imgPath"
            }
        }
    }
}
