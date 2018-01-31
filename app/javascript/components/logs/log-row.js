import React from 'react'

class LogRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      isEditing: false
    }

    this.displayRow = this.displayRow.bind(this)
    this.saveRow = this.saveRow.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.removeLog = this.removeLog.bind(this)
  }

  displayRow() {
    const { id, name, description, ocurred_on } = this.state
    return <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{ocurred_on}</td>
      <td>
        <button
          onClick={() => {
            this.setState({ isEditing: true })
          }}
        >Edit</button>
        <button
          onClick={ () => { this.removeLog(id) } }
        >Delete</button>
      </td>
    </tr>
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target.value,
    })
  }

  editRow() {
    const { id, name, description, ocurred_on } = this.state
    return <tr>
      <td>{id}</td>
      <td>
        <input type="text" value={name}
          onChange={(e) => this.handleChange(e, 'name')}
        />
      </td>
      <td>
        <input type="text" value={description}
          onChange={(e) => this.handleChange(e, 'description')}
        />
      </td>
      <td>
        <input type="text" value={ocurred_on}
          onChange={(e) => this.handleChange(e, 'ocurred_on')}
        />
      </td>
      <td>
        <button
          onClick={this.saveRow}
        >Save</button>
      </td>
    </tr>
  }

  removeLog(id){
    fetch(`/logs/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'X-Requested-With': "XMLHttpRequest",
        'X-CSRF-Token': this.props.authenticity_token
      },
      credentials: 'same-origin',
      mode: 'same-origin'
    }).then(response => response.json())
      .then(json => {
        this.props.removeLog(id)
      })
  }

  saveRow() {
    const { authenticity_token, id, name, description, ocurred_on } = this.state
    const body = JSON.stringify({
      log: {
        name,
        description,
        ocurred_on
      }
    })
    fetch(`/logs/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'X-Requested-With': "XMLHttpRequest",
        'X-CSRF-Token': authenticity_token
      },
      credentials: 'same-origin',
      mode: 'same-origin',
      body
    }).then(response => response.json())
      .then(json => {
        if(json.errors) {
          this.setState({
            errors: json.errors
          })
        } else {
          this.setState({ isEditing: false })
        }
      })
  }

  render() {
    return this.state.isEditing
      ? this.editRow()
      : this.displayRow()
  }
}

export default LogRow
