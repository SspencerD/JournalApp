import React from 'react'

export const NothingSelected = () => {
    return (
        <>
        <div className="content">
            <div className="bed">
                <div className="octo">
                    <div className="octo_head">
                        <div className="octo_fin"></div>
                        <span className="octo_eye eye--right"></span>
                        <span className="octo_eye eye--left"></span>
                        <div className="octo_mouth">
                            <span className="octo_mouth-tongue"></span>
                        </div>
                    </div> 

          <div className="octo_legs">
                        <span className="octo_leg leg-1"></span>
                        <span className="octo_leg leg-2"></span>
                        <span className="octo_leg leg-3"></span>
                        <span className="octo_leg leg-4"></span>
                        <span className="octo_leg leg-5"></span>
                    </div> 
        </div>
            </div>
            <div className="texto">
                <h1> Nada seleccionado para ver</h1>
            </div>
            </div >
        </>

    )
}
