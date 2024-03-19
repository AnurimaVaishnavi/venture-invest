import {
    CalendarDays,
    CalendarRange,
    CheckSquare,
    ChevronDownCircle,
    Clock,
    Heading,
    ListTodo,
    PencilLine,
    Text,
    ToggleRight,
    Type,
    GanttChart
    } from 'lucide-react';
import DraggableButton from './DraggableButton';
import TextArea from 'react-bootstrap';
const elementGroups = [
    {
        title: 'Layout Elements',
        elements : [
            {
                text: "Heading",
                Icon: Heading,
            },
            {
                text: 'Description',
                Icon: PencilLine,
            },
        ],
    },
    {
        title: 'Text Elements',
        elements: [
            { text: 'Single Line',
              Icon: Type,
            },
            {
                text: 'Multi-line',
                Icon: GanttChart,
            },
        ],

    }
];

// const filteredElementGroups = elementGroups.map (({elements, title}, i) => {
//     const filteredElements = elem

// });


export default function FormElements (){
    return (
        <div>
            <div className="space-y-1">
            <h1 className="text-lg font-semibold">Form Elements</h1>
            <h2 className="text-sm "> Drag elements to the right</h2>
            {/* <SearchInput placeholder="Search Elements" /> */}
            </div>
            {elementGroups.map(({ title, elements }, groupIndex) => (
                <div key={groupIndex}>
                    <h2>{title}</h2>
                    <div>
                    {
                    elements.map(({ text, Icon }, elementIndex) => {
                        return (
                        <DraggableButton text={text} Icon={Icon} />
                        );
                    })}
                    </div>
                </div>
            ))}
            <div>

            </div>
        </div>
    );
}


