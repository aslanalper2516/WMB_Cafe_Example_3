// Placeholder API endpoint handler for franchise applications
// Replace this with your actual serverless function or API route

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const formData = req.body
    
    // Log the application (in production, save to database)
    console.log('Franchise Application Received:', {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      investmentRange: formData.investmentRange,
      preferredContactTime: formData.preferredContactTime,
      notes: formData.notes,
      timestamp: new Date().toISOString()
    })

    // Honeypot check (if filled, likely spam)
    if (formData.website) {
      return res.status(200).json({ success: true }) // Still return success to avoid revealing the honeypot
    }

    // TODO: Implement rate limiting
    // TODO: Save to database
    // TODO: Send notification email
    
    return res.status(200).json({ 
      success: true, 
      message: 'Application received successfully' 
    })
  } catch (error) {
    console.error('Error processing franchise application:', error)
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    })
  }
}

