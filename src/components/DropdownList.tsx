import React from 'react';

const DropdownList: React.FC<{className: string}> = (props) => {
    const {children, className} = props
    return (
        <div className={className}>
            {children}
        </div>
    )
}
export default DropdownList