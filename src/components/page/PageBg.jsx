import React from 'react'

const PageBg = ({ children, bgUrl }) => {
  return (
    <div className="box-2">
        {children}
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0.7,
                backgroundImage: `url(${bgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                zIndex: -1,
            }}
        />
    </div>
  )
}

export default PageBg
