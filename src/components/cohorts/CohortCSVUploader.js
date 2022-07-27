import { useState, useRef } from 'react'

import CSVParser from 'utils/csvParser'

function CohortCSVUploader({uploadStudentList}) {

  const csvInputRef = useRef()

  const [csvParser, setCSVParser] = useState({})

  const handleChangeFiles = e => {
    if (csvInputRef.current.files.length) {
      setCSVParser( new CSVParser(csvInputRef.current) )
    }
  }

  const handleAddFromCSV = (e) => {
    e.preventDefault()
    console.log(csvParser.parsedNames)
  }

  return (
    <form onSubmit={handleAddFromCSV} className="background-grey padding-small border-round">
      <label style={{marginTop: 0}} htmlFor="csv-upload">Upload CSV</label>
      <input onChange={handleChangeFiles} ref={csvInputRef} name="csv-upload" type="file" className="text-white" />
      <input type="submit" value="Upload to Cohort" />
    </form>
  )
}

export default CohortCSVUploader
