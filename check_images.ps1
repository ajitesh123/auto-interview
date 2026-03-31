$mdxFiles = Get-ChildItem -Path d:\auto-interview\data\blog -Filter *.mdx
$missing = @()
foreach ($file in $mdxFiles) {
    $content = Get-Content $file.FullName
    $imageLine = $content | Select-String -Pattern "^images:\s*\[\s*'(.*?)'\s*\]"
    if ($imageLine) {
        $imgPath = $imageLine.Matches[0].Groups[1].Value
        $localPath = "d:\auto-interview\public" + $imgPath.Replace('/', '\')
        if (-not (Test-Path $localPath)) {
            $missing += [PSCustomObject]@{ File = $file.Name; Image = $imgPath }
        }
    }
}
$missing | Format-Table -AutoSize
if ($missing.Count -eq 0) { Write-Host "All images exist." }
