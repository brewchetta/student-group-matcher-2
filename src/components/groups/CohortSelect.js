function CohortSelect({cohorts, selectedCohort, setSelectedCohort}) {

  function handleSelectChange(e) {
    setSelectedCohort(e.target.value)
  }

  const renderedOptions = cohorts.map(c => <option key={c} value={c}>{c}</option>)

  return (

    <form>

      <select className="border-primary border-round background-alternate" value={selectedCohort} onChange={handleSelectChange}>

        {renderedOptions}

      </select>

    </form>

  )

}

export default CohortSelect
