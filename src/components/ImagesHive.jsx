import React from 'react'
import { Figure } from 'react-bootstrap'

function ImagesHive(props) {
  const { hiveDetails } = props

  return (
    <Figure className='imageLi'>
      {
          !hiveDetails.imagesfiles ? <></> : hiveDetails.imagesfiles.map((eachImage) => {
            return (<Figure.Image className='imageDet'
              width={171}
              height={180}
              alt="171x180"
              src={eachImage}
            />
            
            )
        })
        }
  </Figure>
  )
}

export default ImagesHive