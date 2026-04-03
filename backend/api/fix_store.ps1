(Get-Content -Path 'd:\Projects\AURUM\frontend\src\hooks\useStore.js' -Raw) -replace 'hosp-001', 'PUN001' | Set-Content -Path 'd:\Projects\AURUM\frontend\src\hooks\useStore.js'
