const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export async function fetchHealth() { const res = await fetch(`${API_BASE}/health`); return res.json() }
export async function fetchPing() { const res = await fetch(`${API_BASE}/ping`); return res.json() }
export async function fetchCrops() { const res = await fetch(`${API_BASE}/crops`); return res.json() }
export async function fetchCropDetails(id:string) { const res = await fetch(`${API_BASE}/crops/${id}`); if(!res.ok) throw new Error('Crop not found'); return res.json() }
export async function fetchRecommendations() { const res = await fetch(`${API_BASE}/recommendations`); return res.json() }
export async function fetchSoilData() { const res = await fetch(`${API_BASE}/soil`); return res.json() }
export async function fetchSoilThresholds() { const res = await fetch(`${API_BASE}/soil/thresholds`); return res.json() }
export async function createSoilReport(data:Record<string,unknown>){ const res=await fetch(`${API_BASE}/soil/report`,{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }); return res.json() }
export async function fetchLatestSoilReport(farmerId:string){ const res=await fetch(`${API_BASE}/soil/latest/${farmerId}`); return res.json() }
export async function fetchSoilHealth(farmerId:string){ const res=await fetch(`${API_BASE}/soil/health/${farmerId}`); return res.json() }
export async function fetchSoilReports(farmerId:string,page=1,limit=20){ const res=await fetch(`${API_BASE}/soil/report/${farmerId}?page=${page}&limit=${limit}`); return res.json() }
export async function fetchSoilHistory(farmerId:string){ const res=await fetch(`${API_BASE}/soil/history/${farmerId}`); return res.json() }
export async function fetchWeatherData(){ const res=await fetch(`${API_BASE}/weather`); return res.json() }
export async function fetchWeatherByCoords(lat:number,lon:number){ const res=await fetch(`${API_BASE}/weather?lat=${lat}&lon=${lon}`); return res.json() }
export async function fetchWeatherAlerts(lat:number,lon:number){ const res=await fetch(`${API_BASE}/weather/alerts?lat=${lat}&lon=${lon}`); return res.json() }
export async function registerUser(data:{name:string;email:string;password:string;role?:string}){ const res=await fetch(`${API_BASE}/auth/register`,{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }); return res.json() }
export async function loginUser(data:{email:string;password:string}){ const res=await fetch(`${API_BASE}/auth/login`,{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data) }); return res.json() }
export async function fetchCurrentUser(token:string){ const res=await fetch(`${API_BASE}/auth/me`,{ headers:{ Authorization:`Bearer ${token}` } }); return res.json() }
