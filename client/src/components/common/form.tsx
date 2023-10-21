import React from 'react';
import { Box, Stack, 
        Typography, FormControl, 
        FormHelperText, TextField, 
        TextareaAutosize, MenuItem, 
        Select, Button } 
from '@mui/material';
import { FormProps } from 'interfaces/common';
import { CustomButton } from 'components';
import { KeyboardArrowDown } from '@mui/icons-material'

const Form = ( { type, register, onFinish, formLoading, handleSubmit, handleImageChange, onFinishHandler, propertyImage }: FormProps ) => {
  const icon = ()  => {return (<KeyboardArrowDown sx={{color: "primary.dark", marginRight: "1rem"}} />)};
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} sx={{color: "primary.dark"}}>
        {type} a Property
      </Typography>
      <Box mt={2.5} borderRadius="15px" padding="20px" sx={{bgcolor: "background.paper"}}>
        <form
          action="create"
          resource="post"
          style={{
              marginTop: "20px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "primary.dark",
              }}
            >
              Enter property name
            </FormHelperText>
            <TextField
                fullWidth
                required
                color="info"
                variant="outlined"
                {...register("title", { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "primary.dark",
              }}
            >
              Enter Description
            </FormHelperText>
            <TextareaAutosize
              required
              variant="outlined"
              {...register("description", { required: true })}
              style={{
                width: "100%",
                background: "transparent",
                fontSize: "16px",
                borderColor: "rgba(0,0,0,0.23)",
                borderRadius: 6,
                padding: 10,
                color: localStorage.getItem("colorMode")==="dark" ? "#ffffff" : "#626262",
              }}
              minRows={5}
            />
          </FormControl>
          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "primary.dark",
                }}
              >
                Select Property Type
              </FormHelperText>
              <Select
                  variant="outlined"
                  color="info"
                  displayEmpty
                  required
                  inputProps={{ "aria-label": "Without label" }}
                  defaultValue="apartment"
                  {...register("propertyType", {
                      required: true,
                  })}
                  IconComponent={icon}
                  sx={{ color: "text.primary" }}
              >
                <MenuItem value="apartment">Apartment</MenuItem>
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="farmhouse">farmhouse</MenuItem>
                <MenuItem value="condos">Condos</MenuItem>
                <MenuItem value="townhouse">Townhouse</MenuItem>
                <MenuItem value="duplex">Duplex</MenuItem>
                <MenuItem value="studio">Studio</MenuItem>
                <MenuItem value="chalet">Chalet</MenuItem>
                <MenuItem value="retail space">Retail Space</MenuItem>
                <MenuItem value="office space">Office Space</MenuItem>
                <MenuItem value="hotel">Hotel</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "primary.dark",
                }}
              >
                Enter property price
              </FormHelperText>
              <TextField
                fullWidth
                required
                color="info"
                variant="outlined"
                {...register("price", { required: true })}
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "primary.dark",
              }}
            >
              Enter Location
            </FormHelperText>
            <TextField
                fullWidth
                required
                color="info"
                variant="outlined"
                {...register("location", { required: true })}
            />
          </FormControl>

          <Stack
              direction="column"
              gap={1}
              justifyContent="center"
              mb={2}
          >
            <Stack direction="row" gap={2}>
              <Typography
                  fontSize={16}
                  fontWeight={500}
                  my="10px"
                  sx={{color: "primary.dark",}}
              >
                Property Photo
              </Typography>

              <Button
                component="label"
                sx={{
                    width: "fit-content",
                    color: "#38b000",
                    textTransform: "capitalize",
                    fontSize: 16,
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(
                      e: React.ChangeEvent<HTMLInputElement>,
                  ) => {
                      handleImageChange(e.target.files![0]);
                  }}
                />
              </Button>
            </Stack>
            <Typography
                fontSize={14}
                sx = {{color:"text.secondary", wordBreak: "break-all"}}
            >
              {propertyImage?.name}
            </Typography>
          </Stack>

          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#38b000"
            color="#ffffff"
          />
        </form>
      </Box>
    </Box>
  )
}

export default Form;