import sys
with open('C:\\Users\\sidda\\OneDrive\\Documents\\my-backend\\config\\app.js', 'r') as f:
    content = f.read()
old = "app.use('/api/analyze-soil', analyzeSoilRoutes);"
new = "app.use('/api/analyze-soil', analyzeSoilRoutes);\n# Fertilizer routes\napp.use('/api/fertilizer', require('./routes/fertilizerRoutes'));\n# Pest routes\napp.use('/api/pests', require('./routes/pestRoutes'));\n# Mandi routes\napp.use('/api/mandi', require('./routes/mandiRoutes'));\n# Farm advisory routes\napp.use('/api/farm', require('./routes/farmRoutes'));\n# Dashboard routes\napp.use('/api/dashboard', require('./routes/dashboardRoutes'))"
if old in content:
    content = content.replace(old, new)
    with open('C:\\Users\\sidda\\OneDrive\\Documents\\my-backend\\config\\app.js', 'w') as f:
        f.write(content)
    print('File updated successfully')
else:
    print('Pattern not found')