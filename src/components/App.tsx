import React from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'

import TodoList from './TodoList'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(4)
  }
}))

const App: React.FC = () => {
  const styles = useStyles()

  return (
    <Container maxWidth="md" className={styles.container}>
      <Typography
        variant="h4"
        //@ts-ignore
        component="h1"
        align="center"
      >
        TODO app
      </Typography>
      <TodoList />
    </Container>
  )
}

export default App
