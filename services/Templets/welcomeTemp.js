const signupWelcomeTemp = (name) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Roboto&display=swap');
        </style>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f5f1e8;">
        <!--[if mso]>
        <style type="text/css">
        body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
        </style>
        <![endif]-->
        
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <tr>
                <td style="background: #2A1B17; padding: 30px 40px; text-align: center;">
                    <h1 style="font-family: 'Playfair Display', serif; color: #D4AF37; margin: 0; font-size: 32px;">
                        <span style="font-size: 40px;">👑</span><br>
                        R Royal Coffee
                    </h1>
                </td>
            </tr>

            <!-- Main Content -->
            <tr>
                <td style="padding: 40px 40px 20px 40px;">
                    <h2 style="font-family: 'Playfair Display', serif; color: #2A1B17; margin-top: 0;">Welcome to the Royal Family!</h2>
                    <p style="font-family: 'Roboto', sans-serif; color: #555555; line-height: 1.6;">
                        Dear ${name},<br><br>
                        We're delighted to welcome you to R Royal Coffee! As a member of our royal court, you'll now enjoy:
                    </p>
                    
                    <div style="background: #F8F5F0; padding: 20px; margin: 25px 0; border-left: 4px solid #D4AF37;">
                        <ul style="margin: 0; font-family: 'Roboto', sans-serif; color: #2A1B17; padding-left: 20px;">
                            <li>Exclusive access to royal blends</li>
                            <li>First priority on new arrivals</li>
                            <li>Members-only discounts and offers</li>
                            <li>VIP customer support</li>
                        </ul>
                    </div>

                    <p style="font-family: 'Roboto', sans-serif; color: #555555; line-height: 1.6;">
                        To celebrate your coronation, please accept this special gift:<br>
                        <strong style="color: #D4AF37; font-size: 18px;">10% OFF</strong> your first order with code: <strong>ROYALWELCOME10</strong>
                    </p>
                </td>
            </tr>

            <!-- CTA Button -->
            <tr>
                <td style="padding: 0 40px 40px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="background: #D4AF37; text-align: center; padding: 15px; border-radius: 4px;">
                                <a href="#" style="font-family: 'Roboto', sans-serif; color: #2A1B17; text-decoration: none; font-weight: bold; display: block;">
                                    START YOUR ROYAL JOURNEY
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="background: #2A1B17; padding: 30px 40px; text-align: center;">
                    <p style="font-family: 'Roboto', sans-serif; color: #D4AF37; margin: 0; font-size: 14px;">
                        © 2023 R Royal Coffee<br>
                        Brewing Excellence Since 2015<br>
                        <a href="#" style="color: #ffffff; text-decoration: none;">Unsubscribe</a> | 
                        <a href="#" style="color: #ffffff; text-decoration: none;">Preferences</a>
                    </p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};

module.exports = signupWelcomeTemp;