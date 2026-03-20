export default function handler(req, res) {
  let userName = "Gig Worker";
  const cookies = req.headers.cookie;

  if (cookies) {
    const match = cookies.match(/klaimName=([^;]+)/);
    if (match) {
      userName = decodeURIComponent(match[1]);
    }
  }

  res.status(200).json({
    userName: userName,
    riskScore: 24,
    riskLevel: "Low Risk",
    weeklyPremium: 49,
    coverageAmount: 25000,
    activePolicies: 1,
    totalClaims: 0,
    lastUpdated: new Date().toISOString()
  });
}
