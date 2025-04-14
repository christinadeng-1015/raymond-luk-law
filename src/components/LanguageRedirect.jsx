import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LanguageRedirect = ({ lang }) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    navigate('/'); 
  }, [lang, i18n, navigate]);

  return null;
};

export default LanguageRedirect;
