import { scrollArea } from '../fields/ScrollArea';
import { useFormPlaygroundStore } from '../store/formPlaygroundStore';
import { Container, Row, Col } from 'react-bootstrap';
import FormElementCard from './FormElementCard';




export default function FormPreview() {
    const formElements = useFormPlaygroundStore(state => state.formElements);

    return (
        <section className="flex-grow rounded-lg border-2 border-dashed border-slate-300 bg-muted">
            {formElements.length === 0 ? (
                <p className="h-[calc(100vh-120px)] flex h-full items-center justify-center font-medium text-muted-foreground">Add some form elements in the builder view</p>
            ) : (
                <div className="overflow-auto h-[calc(100vh-120px)] mr-20">
                    <ul className="space-y-5 p-5">
                        {formElements.map((element, index) => (
                            <li key={index}>
                            <FormElementCard {...element} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}





//   return (
   
//       {formElements.length === 0 ? (
//       ) : (
//         <ScrollArea className="h-[calc(100vh-212px)]">
//           <ul className="space-y-5 p-5">
//             {formElements.map(element => (
//               <li key={element.id}>
//                 <FormElementCard formElement={element} isView />
//               </li>
//             ))}
//           </ul>
//         </ScrollArea>
//       )}
//   );

