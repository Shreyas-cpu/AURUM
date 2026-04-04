import os

filePath = 'd:/Projects/AURUM/frontend/src/apps/ambulance-driver/AmbulanceMain.jsx'
content = open(filePath, 'r', encoding='utf-8').read()

content = content.replace(
    'className="flex flex-col h-full overflow-hidden"', 
    'className="flex flex-row-reverse h-full overflow-hidden"'
)

content = content.replace(
    "<div style={{ height: '60%', flexShrink: 0, position: 'relative' }}>",
    "<div style={{ width: '60%', height: '100%', flexShrink: 0, position: 'relative', borderLeft: '1px solid #1e2d3d' }}>"
)

content = content.replace(
    'className="flex-1 flex flex-col overflow-y-auto border-t"',
    'className="flex-1 flex flex-col overflow-y-auto"'
)

open(filePath, 'w', encoding='utf-8').write(content)
print("Transformation Complete")
