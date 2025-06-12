import React from 'react';

interface FooterProps {
  isMobile?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isMobile = false }) => {
  const currentYear = new Date().getFullYear();

  const footerStyle: React.CSSProperties = {
    backgroundColor: 'white',
    color: '#374151',
    padding: isMobile ? '20px 16px' : '32px 20px',
    marginTop: '32px',
    borderTop: '1px solid #e5e7eb',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: isMobile ? '16px' : '24px',
  };

  const brandSectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxWidth: isMobile ? '100%' : '400px',
  };

  const brandStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: isMobile ? '18px' : '20px',
    fontWeight: '600',
    color: '#111827',
  };

  const descriptionStyle: React.CSSProperties = {
    margin: 0,
    color: '#6b7280',
    fontSize: '14px',
    lineHeight: '1.6',
  };

  const logoStyle: React.CSSProperties = {
    width: '36px',
    height: '36px',
    backgroundColor: '#1565c0',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
  };

  const supportStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMobile ? 'center' : 'flex-end',
    gap: '6px',
  };

  const linkStyle: React.CSSProperties = {
    color: '#1565c0',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    cursor: 'pointer',
  };

  const copyrightStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#6b7280',
    textAlign: isMobile ? 'center' : 'right',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={brandSectionStyle}>
          <div style={brandStyle}>
            <div style={logoStyle}>
              💰
            </div>
            Finance Manager
          </div>
          <p style={descriptionStyle}>
            Take control of your finances with our intuitive expense tracking solution. 
            Manage expenses and categories with ease.
          </p>
        </div>

        <div style={supportStyle}>
          <a 
            href="mailto:support@financemanager.com" 
            style={linkStyle}
            onMouseEnter={(e) => e.currentTarget.style.color = '#1e40af'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#1565c0'}
          >
            Contact Support
          </a>
          <div style={copyrightStyle}>
            © {currentYear} Finance Manager. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;