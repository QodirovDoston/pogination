import { Pagination, PaginationItem } from "@mui/material";
import { Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row, } from "react-bootstrap";

function App() {
  const [countries, setCountries] = useState()
  const [page, setPage] = useState(3)
  const [limit, setLimit] = useState(5)
  const [len, setLen] = useState()
  console.log(setLimit);

  const getdata = () => {
    axios.get(`https://for-xurshidbekvabolalaruchunserver-production.up.railway.app/data?_limit=${limit}&_page=${page}`)
      .then((data) => {
        setCountries(data?.data)
        console.log(data);
      })
  }

  const allData = () => {
    axios.get(`https://for-xurshidbekvabolalaruchunserver-production.up.railway.app/data`)
      .then((data) => {
        setLen(data?.data.length / limit)
      })
    }
    let pagenum = Math.ceil(len)
  useEffect(() => {
    getdata()
    allData()
    //eslint-disable-next-line
  }, [limit, page] )

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-3">
          <Col xs={8}>
            <ListGroup>
              {countries?.map((value) => {
                return (
                  <>
                    <ListGroup.Item>{value?.state}</ListGroup.Item>
                  </>
                )
              })}
            </ListGroup>
            <Stack spacing={2} className="mt-3">
              <Pagination
                color="secondary"
                count={pagenum}
                page={page}
                onChange={(_, num) => setPage(num)}
                renderItem={(item) => (
                  <PaginationItem
                    to={`?_limit=${limit}&page=${page}`}
                    {...item}
                  />
                )}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;