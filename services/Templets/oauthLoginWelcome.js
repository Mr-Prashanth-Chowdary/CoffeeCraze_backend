const oauthLoginWelcome = (name,email) => {
    return `<!DOCTYPE html>
<html>
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');
    </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9fa;">
    <!--[if mso]>
    <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
    </style>
    <![endif]-->
    
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <!-- Header -->
        <tr>
            <td style="background: #ffffff; padding: 30px 40px; text-align: center; border-bottom: 2px solid #f1f3f4;">
                <div style="margin-bottom: 15px;">
                    <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" 
                         alt="Google Logo" 
                         width="136" 
                         height="46" 
                         style="display: block; margin: 0 auto;">
                </div>
                <h1 style="font-family: 'Roboto', sans-serif; color: #202124; margin: 0; font-size: 24px; font-weight: 500;">
                    Secure Login Confirmation
                </h1>
            </td>
        </tr>

        <!-- Main Content -->
        <tr>
            <td style="padding: 40px 40px 30px 40px;">
                <h2 style="font-family: 'Roboto', sans-serif; color: #202124; margin-top: 0; font-weight: 500;">Hello ${name},</h2>
                
                <div style="background: #f8f9fa; padding: 25px; margin: 25px 0; border-radius: 8px;">
                    <p style="font-family: 'Roboto', sans-serif; color: #5f6368; line-height: 1.6; margin: 0 0 15px 0;">
                        <span style="color: #34a853;">✓</span> <strong>Successfully logged in</strong> using Google<br>
                        <span style="color: #34a853;">✓</span> <strong>Account email:</strong> ${email}
                    </p>
                    
                    <div style="border-top: 1px solid #ecedee; margin: 20px 0; padding-top: 20px;">
                        <p style="font-family: 'Roboto', sans-serif; color: #5f6368; line-height: 1.6; margin: 0;">
                            <strong style="color: #202124;">We only access:</strong><br>
                            • Your account name<br>
                            • Email address
                        </p>
                    </div>
                </div>

                <div style="background: #fef7e0; padding: 25px; border-radius: 8px; margin: 25px 0;">
                    <p style="font-family: 'Roboto', sans-serif; color: #5f6368; margin: 0 0 15px 0; line-height: 1.6;">
                        <span style="color: #fbbc04; font-weight: 500;">Important Privacy Assurance:</span>
                    </p>
                    <ul style="margin: 0; padding-left: 20px; font-family: 'Roboto', sans-serif; color: #5f6368;">
                        <li style="margin-bottom: 8px;">✖️ No profile picture access</li>
                        <li style="margin-bottom: 8px;">✖️ No contact list access</li>
                        <li>✖️ No Google Drive/files access</li>
                    </ul>
                </div>

                <p style="font-family: 'Roboto', sans-serif; color: #5f6368; line-height: 1.6; margin: 25px 0 0 0;">
                    <span style="color: #ea4335;">🔒 Security Note:</span> This is a beta service - we never store<br> 
                    your Google credentials or access other services.
                </p>
            </td>
        </tr>

        <!-- Footer -->
        <tr>
            <td style="background: #f8f9fa; padding: 30px 40px; text-align: center; border-top: 2px solid #f1f3f4;">
                <p style="font-family: 'Roboto', sans-serif; color: #5f6368; margin: 0; font-size: 14px; line-height: 1.6;">
                    <img src="https://www.gstatic.com/identity/boq/accountsettings/security_20x20_ffffff.png" 
                         alt="Security Shield" 
                         width="20" 
                         height="20" 
                         style="vertical-align: middle; margin-right: 8px;">
                    Protected by Google's security systems
                </p>
                <div style="margin-top: 20px;">
                    <a href="#" style="color: #1a73e8; text-decoration: none; font-family: 'Roboto', sans-serif; margin: 0 10px; font-size: 13px;">Privacy Policy</a>
                    <span style="color: #dadce0;">|</span>
                    <a href="#" style="color: #1a73e8; text-decoration: none; font-family: 'Roboto', sans-serif; margin: 0 10px; font-size: 13px;">Contact Support</a>
                </div>
            </td>
        </tr>
    </table>
</body>
</html>`
}

module.exports = oauthLoginWelcome