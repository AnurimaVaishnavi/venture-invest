import {useState} from 'react';
import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Layout from '../src/components/Layout';
import LeftColumn from '../src/components/LeftColumn';
import MiddleColumn from '../src/components/MiddleColumn';
import RightColumn from '../src/components/RightColumn';
export default function  VentureHome()  {
  const [isLoading, setLoading] = useState(false);

  // setLoading false until we obtain all the data from the backend in the later code
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  //  }, []);

return  (
  <Layout>
  <div id="base">
  <Stack  direction="horizontal" gap={5} justify="center">
      <div className="p-2" id="prof">
      <LeftColumn isLoading={isLoading} />
      </div>
      <div className="p-2" id="feed"><MiddleColumn isLoading={isLoading} /></div>
      <div className="p-2" id="others">
      <RightColumn isLoading={isLoading} />
      </div>
    </Stack>

  </div>
  </Layout>
)};

