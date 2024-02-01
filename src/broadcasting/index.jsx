import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { getDatabaseTable } from '../firebase'
import { get, push, set } from 'firebase/database'
import { Button, TextField } from '@mui/material'
import Icon from '../icon'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../navbar'

export default function Broadcasting() {
  const [data, setData] = useState()
  const [isAddingNewRow, setIsAddingNewRow] = useState(false)
  const [formValue, setFormValue] = useState({
    abitazione: '',
    mese: '',
  })
  const [isEditing, setIsEditing] = useState('')

  const table = getDatabaseTable('broadcasting')
  const fetchData = () => {
    get(table).then((snapshot) => {
      if (snapshot.exists()) {
        setData(snapshot.val())
      }
    })
  }
  const setValues = (value, key) => {
    setFormValue((prev) => ({ ...prev, [key]: value }))
  }
  const setBroadcastingData = () => {
    push(table, formValue)
    setIsAddingNewRow(false)
    clearForm()
    fetchData()
  }
  const editRow = () => {
    const currentRow = getDatabaseTable(`broadcasting/${isEditing}`)
    set(currentRow, formValue)
    setIsEditing('')
    clearForm()
    fetchData()
  }

  const removeRow = (id) => {
    const currentRow = getDatabaseTable(`broadcasting/${id}`)
    set(currentRow, null)
    fetchData()
  }

  const clearForm = () => {
    setFormValue({ abitazione: '', mese: '' })
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Navbar></Navbar>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <caption>
            <Button
              fullWidth
              variant="contained"
              endIcon={<Icon icon={fas.faPlus}></Icon>}
              onClick={() => {
                setIsAddingNewRow(true)
              }}
              disabled={isAddingNewRow}
            >
              AGGIUNGI NUOVO BROADCASTING
            </Button>
          </caption>
          <TableHead>
            <TableRow>
              <TableCell align="center">ABITAZIONI</TableCell>
              <TableCell align="center">DATA</TableCell>
              <TableCell align="center">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && (
              <>
                {Object.entries(data).map((row, index) => (
                  <>
                    {isEditing !== row[0] && (
                      <TableRow key={`row-${index}`}>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].abitazione}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          {row[1].mese}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <Button
                            onClick={() => {
                              setIsEditing(row[0])
                              setFormValue(row[1])
                            }}
                          >
                            <Icon icon={fas.faEdit}></Icon>
                          </Button>
                          <Button
                            onClick={() => {
                              removeRow(row[0])
                            }}
                          >
                            <Icon icon={fas.faClose}></Icon>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                    {isEditing === row[0] && (
                      <TableRow key={`row-${index}-edit`}>
                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            label="Abitazione"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(e.target.value, 'abitazione')
                            }}
                            value={formValue.abitazione}
                          ></TextField>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <TextField
                            label="Mese"
                            variant="outlined"
                            onChange={(e) => {
                              setValues(e.target.value, 'mese')
                            }}
                            value={formValue.mese}
                          ></TextField>
                        </TableCell>
                        <TableCell align="center" component="th" scope="row">
                          <Button onClick={editRow}>
                            <Icon icon={fas.faSave}></Icon>
                          </Button>
                          <Button
                            onClick={() => {
                              setIsEditing('')
                            }}
                          >
                            <Icon icon={fas.faClose}></Icon>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </>
            )}
            {isAddingNewRow && (
              <TableRow key={`add-row`}>
                <TableCell align="center" component="th" scope="row">
                  <TextField
                    label="Abitazione"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(e.target.value, 'abitazione')
                    }}
                    value={formValue.abitazione}
                  ></TextField>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <TextField
                    label="Mese"
                    variant="outlined"
                    onChange={(e) => {
                      setValues(e.target.value, 'mese')
                    }}
                    value={formValue.mese}
                  ></TextField>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <Button onClick={setBroadcastingData}>
                    <Icon icon={fas.faSave}></Icon>
                  </Button>
                  <Button
                    onClick={() => {
                      setIsAddingNewRow(false)
                    }}
                  >
                    <Icon icon={fas.faClose}></Icon>
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <footer>
        <p>© 2024 - GESTIONALE SAVA 2 </p>
      </footer>
    </div>
  )
}
