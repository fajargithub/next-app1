import * as FeatherIcons from 'react-feather';

const iconComponents = Object.keys(FeatherIcons).reduce((acc, icon) => {
    if(icon !== 'default'){
        acc[icon] = FeatherIcons[icon];
    }
    return acc;
}, {});

export default function FeatherIcon({ icon, ...props }) {
    const IconComponent = iconComponents[icon];
    if(!IconComponent) return null;

    return <IconComponent {...props} />;
}