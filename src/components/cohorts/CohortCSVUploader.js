import { useState, useRef } from 'react'

import CSVParser from 'utils/csvParser'

import CohortCSVSelectionSheet from './CohortCSVSelectionSheet'

function CohortCSVUploader({uploadStudentList}) {

  const csvInputRef = useRef()

  const [csvParser, setCSVParser] = useState({})
  const [csvListOpen, setCSVListOpen] = useState(false)

  const handleChangeFiles = e => {
    if (csvInputRef.current.files.length) {
      setCSVParser( new CSVParser(csvInputRef.current) )
    }
  }

  const handleAddFromCSV = (e) => {
    e.preventDefault()
    setCSVListOpen(true)
  }

  const closeCSVList = () => setCSVListOpen(false)

  return (
    <>
      <form onSubmit={handleAddFromCSV} className="background-grey padding-small border-round">
        <label style={{marginTop: 0}} htmlFor="csv-upload">Upload CSV</label>
        <input onChange={handleChangeFiles} ref={csvInputRef} name="csv-upload" type="file" className="text-white" />
        <input type="submit" value="Upload to Cohort" />
      </form>


      {
        /* show list of students to include if CSV is uploaded and open */

        csvListOpen
        ?
          <CohortCSVSelectionSheet
            onClickOut={closeCSVList}
            modalClassName="csv-checklist"
            csvNamesList={csvParser?.parsedNames}
          />
        :
          null

      }

    </>
  )
}

export default CohortCSVUploader
