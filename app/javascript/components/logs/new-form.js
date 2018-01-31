import React from 'react'
import TextInput from '../text-input'

import './new-form.css'

class NewLogForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: {
        name: '',
        description: '',
        ocurred_on: '',
      },
      name: '',
      description: '',
      ocurred_on: '',
      authenticity_token: props.authenticity_token,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSave = this.handleSave.bind(this)
  }

  handleChange(e, key) {
    this.setState({
      [key]: e.target.value,
    })
  }

  handleSave() {
    const { authenticity_token, id, name, description, ocurred_on } = this.state
    const body = JSON.stringify({
      log: {
        name,
        description,
        ocurred_on
      }
    })
    fetch(`/logs/`, {
      method: 'POST',
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
            errors: {
              name: json.errors.name !== undefined ? json.errors.name.join(', ') : '',
              description: json.errors.description !== undefined ? json.errors.description.join(', ') : '',
              ocurred_on: json.errors.ocurred_on !== undefined ? json.errors.ocurred_on.join(', ') : '',
            }
          })
        } else {
          this.setState({
            errors: {
              name: '',
              description: '',
              ocurred_on: '',
            },
            name: '',
            description: '',
            ocurred_on: '',
          })
        }
        this.props.insertLog(json.log)
      })
  }

  render() {
    return (
      <div className='new-log-form'>
        <h2>new log</h2>
        <TextInput
          error={this.state.errors.name}
          value={this.state.name}
          onChange={(e) => this.handleChange(e, 'name')}
          label='Name'
        />
        <TextInput
          error={this.state.errors.description}
          value={this.state.description}
          onChange={(e) => this.handleChange(e, 'description')}
          label='Description'
          display='long'
        />
        <TextInput
          error={this.state.errors.ocurred_on}
          value={this.state.ocurred_on}
          onChange={(e) => this.handleChange(e, 'ocurred_on')}
          label='Ocurred on'
        />
        <div>
          <label>&nbsp;</label>
          <button
            onClick={this.handleSave}
          >Save</button>
        </div>
      </div>
    )
  }
}

export default NewLogForm
