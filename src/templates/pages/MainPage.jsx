import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

const MainPage = () => {
  return (
    <Box>
      <Stack spacing={2}>
        <Grid item md={12} sm={12} fontSize={"50px"} textAlign={"center"}>Это главная страница.</Grid>
      </Stack>
    </Box>
  )
}

export default MainPage