'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { Willow } from 'wx-react-gantt';
import 'wx-react-gantt/dist/gantt.css';
// Dynamically import Gantt with no SSR and explicitly reference the named export
const Gantt = dynamic(() => import('wx-react-gantt').then((mod) => mod.Gantt), {
  ssr: false,
});

const MyGanttComponent = () => {
  const tasks = [
    {
      id: 1,
      text: 'Main task',
      promises: 'Promise 1',
      start: new Date(2025, 0, 5), // 05 Jan 2025
      end: new Date(2025, 11, 20), // 20 Jan 2025
      duration: 8,
      progress: 50,
    },
    {
      id: 2,
      text: 'sub task 1',
      promises: 'Promise 1',
      start: new Date(2025, 1, 1), // 01 Feb 2025
      end: new Date(2025, 3, 30), // 30 Apr 2025
      duration: 8,
      parent: 1,
      progress: 100,
    },
    {
      id: 3,
      text: 'sub task 2',
      promises: 'Promise 2',
      start: new Date(2025, 4, 1), // 01 May 2025
      end: new Date(2025, 6, 30), // 30 Jul 2025
      parent: 1,
    },
    {
      id: 20,
      text: 'sub task 3',
      promises: 'Promise 3',
      start: new Date(2025, 7, 1), // 01 Aug 2025
      end: new Date(2025, 9, 30), // 30 Oct 2025
      parent: 1,
    },
    {
      id: 21,
      text: 'sub task 4',
      promises: 'Promise 5',
      start: new Date(2025, 10, 1), // 01 Nov 2025
      end: new Date(2025, 11, 30), // 30 Dec 2025
      parent: 1,
    },
  ];

  const links = [
    {
      id: 1,
      source: 1,
      target: 2,
      type: '0',
    },
    {
      id: 2,
      source: 1,
      target: 3,
      type: '0',
    },
    {
      id: 3,
      source: 1,
      target: 20,
      type: '0',
    },
    {
      id: 4,
      source: 1,
      target: 21,
      type: '0',
    },
  ];
  const columns = [
    { id: 'text', header: 'Task Name', flexGrow: 1 },
    { id: 'promises', header: 'Promises', flexGrow: 1 },
    { id: 'start', header: 'Start Date' },
    { id: 'end', header: 'End Date' },
  ];
  const scales = [
    { unit: 'month', step: 1, format: 'MMMM yyyy' },
    { unit: 'week', step: 1, format: 'd' },
  ];

  return (
    <Container maxWidth='lg'>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Request Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Mock content for request details.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Products</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box>
            <Typography>Product process</Typography>
            <Willow>
              <Gantt
                tasks={tasks}
                links={links}
                scales={scales}
                columns={columns}
                startDate={new Date(2025, 0, 1)} // 01 Jan 2025
                endDate={new Date(2025, 11, 30)} // 30 Dec 2025
                readonly={true}
              />
            </Willow>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Declarations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Mock content for declarations.</Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

// Ensure the default export is a valid React component
export default function Page() {
  return <MyGanttComponent />;
}
