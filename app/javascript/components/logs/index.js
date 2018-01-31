import React from "react"
import PropTypes from "prop-types"

import LogRow from './log-row'
import NewLogForm from './new-form'

class Logs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }

    this.insertLog = this.insertLog.bind(this)
    this.removeLog = this.removeLog.bind(this)
  }

  insertLog(log) {
    this.setState({
      logs: [...this.state.logs, log]
    })
  }

  removeLog(id) {
    const newState = [...this.state.logs]
    const log = newState.find(log => log.id === id)
    const index = newState.indexOf(log)
    newState.splice(index, 1)
    this.setState({ logs: newState })
  }

  render () {
    return <div>
      <NewLogForm
        insertLog={this.insertLog}
        authenticity_token={this.props.authenticity_token}
      />

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>description</th>
            <th>ocurred on</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {
            this.state.logs.map(log => <LogRow
              {...log}
              authenticity_token={this.props.authenticity_token}
              key={log.id}
              removeLog={this.removeLog}
            />)
          }
        </tbody>
      </table>
    </div>
  }
}

export default Logs
