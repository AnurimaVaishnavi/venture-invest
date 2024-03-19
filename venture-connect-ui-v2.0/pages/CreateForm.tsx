import FormPlayground from '../src/components/form-builder/create-form/FormPlayground';
import FormPreview from '../src/components/form-builder/create-form/FormPreview';
import { DndContext, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useFormPlaygroundStore } from '../src/components/form-builder/store/formPlaygroundStore';
import toast from 'react-hot-toast';
import { Eye, Hammer, Lock } from 'lucide-react';
import {Switch} from '../src/components/form-builder/fields/Switch';
import { useEffect, useState } from 'react';
import { KeyboardSensor, PointerSensor }  from '@dnd-kit/core';
import {FormType} from '../src/components/form-builder/utils/types';
import {Button} from '../src/components/form-builder/fields/Button';
import FormElements from '../src/components/form-builder/create-form/FormElements';
// import {Input} from '../src/components/form-builder/fields/Input';
// import Button from 'react-bootstrap';
import DraggableButton from '../src/components/form-builder/create-form/DraggableButton';
interface Props{
    formType?: 'add' | 'edit';
    form? : FormType,
}

export default function CreateForm ({formType="add",form}: Props ) {
    const [formName, setFormName] = useState(form?.name ?? '');
    const formElements = useFormPlaygroundStore(state => state.formElements);
    const removeAllFormElements = useFormPlaygroundStore(
        state => state.removeAllFormElements,
    );
    const addFormElement = useFormPlaygroundStore(state => state.addFormElement);
    const [preview, setPreview] = useState(false);
    const [isDropped, setIsDropped] = useState(false);
    const setIsPreview = () => (
      setPreview(!preview)
    );
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      }),
    );
    const [activeButton, setActiveButton] = useState(null);
    return (
        <DndContext
        sensors={sensors}
        onDragStart={e=>{
          setActiveButton(e.active.data.current?.element);
          setIsDropped(false);
        }}
        onDragCancel={()=>{
        setActiveButton(null);
        setIsDropped(false);
        }}
        onDragEnd={({over, active}) => {
          setActiveButton(null);
          if (!over) return;
          addFormElement(
            active.data.current?.element.text as string,
            active.id as string,
          );
          setIsDropped(true);
        }}
        >
             <div className="flex gap-12 mx-1.5">
             <FormElements></FormElements>
            <form 
            className="flex flex-grow flex-col"
            onSubmit={e=> {
                e.preventDefault();
                if (formElements.length === 0){
                    toast.error('Form is empty!');
                    return;
                }
            }}>
                 <section className="mb-3 flex items-center justify-between">
                <div className='flex items-center gap-3 whitespace-nowrap'>
                    <label className="font-medium">Form Name:</label>
                    <input placeholder='Enter Form Name'
                    required
                    value = {formName}
                    onChange={(e) => setFormName(e.target.value)} 
                    /> 
                </div>
                <div className="flex items-center gap-4 text-sm font-medium">
              <div
                className={`flex items-center gap-2 transition-colors ${
                  preview ? '' : 'text-blue-700'
                }`}
              >
                <Hammer className="h-5 w-5" />
                <span>Builder</span>
              </div>
              <Switch
                className="data-[state=unchecked]:bg-primary"
                checked={preview}
                onCheckedChange={setIsPreview}
              />
              <div
                className={`flex items-center gap-2 transition-colors ${
                  preview ? 'text-blue-700' : ''
                }`}
              >
                <Eye className="h-5 w-5" />
                <span>Preview</span>
              </div>
            </div>
            </section>
                {
                    preview? (<FormPreview />) : (<FormPlayground />)
                }
            <section>
                <div className='actions'>
                    {formElements.length !==0 ? (<Button variant="destructive"></Button>) : null}
                    {<Button></Button>}

                </div>
                <DragOverlay>
                    {activeButton ? (<DraggableButton className="cursor-grabbing" {...activeButton} />) : null}
                </DragOverlay>
              </section>
            </form>
            </div>

        </DndContext>
    );
}

