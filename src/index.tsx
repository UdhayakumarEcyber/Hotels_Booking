// import * as React from "react";
// import { registerWidget, registerLink, registerUI, IContextProvider, } from './uxp';
// import { TitleBar, FilterPanel, WidgetWrapper , LinkWidgetContainer, Popover, Button, Modal } from "uxp/components";
// import './styles.scss';


import * as React from "react";
import { registerWidget, registerLink, registerUI, IContextProvider, } from './uxp';
import { DataList, Button, WidgetWrapper, MapComponent, Modal, TitleBar, ItemListCard, FilterPanel, DataGrid, ItemCard, FormField, Label, Select, Input, DateRangePicker, DatePicker, Checkbox, ProfileImage, Popover, TrendChartComponent, ToggleFilter } from "uxp/components";
import './styles.scss';


<link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"/>


interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

let RandomItems:Array<Array<{isNormal:boolean,status:string}>> = [];
for(var i=0;i<20;i++) {
    let arr = [];
    for(var j=0;j<20;j++) {
        let isNormal = true;
        let status = 'normal';
        // if (Math.random()*10 > 5) {
        //     status = 'medium';
        // }

        if (Math.random()*10 > 7) {
            status = 'high';
            isNormal = false;
        }

        if (Math.random()*10 > 8) {
            status = 'no-occupancy';
        }

        if (Math.random()*10 > 9) {
            status += ' maintenance';
        }
        arr.push({isNormal,status});
    }
    RandomItems.push(arr);
}

// const Hotels_BookingWidget: React.FunctionComponent<IWidgetProps> = (props) => {

 const Hotels_BookingWidget:React.FunctionComponent<{onClick:(room:any)=>void}> = (props) => {

    let [selected, setSelected] = React.useState<string | null>("op-1");
    let [inputValue, setInputValue] = React.useState<string | null>("sample text");


    const [currentRoom, setCurrentRoom] = React.useState<{}>();

    const [showRT,setShowRT] = React.useState(false);

    function showRTPage() {
        // setShowRT(true);
        window.open('http://ivivaanywhere.ivivacloud.com/Apps/IBMS/demo-rt.json?key=6', '_blank', 'location=yes,height=400,width=800,scrollbars=yes,status=yes');
    }
    let roomsPerFloor = 20;
    let floors = 10;
    let floorItems = [];

    for(var i=0;i<floors;i++) {
        floorItems.push(renderFloor(i));
    }
    function renderFloor(f:number) {
        let items = [];
        items.push(<div className='floor-name'>Floor {f+1}</div>);
        for(var i=0;i<roomsPerFloor;i++) {
            let roomNumber = (f+1)*100 + i + 1;
            let {isNormal,status} = RandomItems[f][i];
            
            let el = <div onClick={()=>{
                if (isNormal) {
                    //setCurrentRoom({room:i,floor:f,status});
                } else {
                    props.onClick({room:i,floor:f,status});
                }
            }} className={'room ' + status} key={i}>
                <div className='txt'>{roomNumber}</div>
                <div className='cell'></div>
            </div>;
            if (isNormal) {
                el = <Popover  title={()=><div className='po-header'>{'Room ' + roomNumber}</div>} content={()=><div className='po-body'>
                    <div className='left'>

                    {
                        status.indexOf('occup')>=0?<div className='pfield'>
                            <div className='pvalue'>Not Occupied</div>
                            </div>:<>
                    <div className='pfield'>
                        <div className='ptitle'>CO2</div>
                        <div className='pvalue'>450ppm</div>
                    </div>
                    <div className='pfield'>
                        <div className='ptitle'>Temperature</div>
                        <div className='pvalue'>23&deg;C</div>
                    </div>
                    <div className='pfield'>
                        <div className='ptitle'>Occupancy</div>
                        <div className='pvalue'>2 persons</div>
                    </div>
                    <div className='pfield'>
                        <Button title={'View RT Page'} onClick={()=>showRTPage()} />
                    </div>
                    </>
                }
                </div>
                <div className='right'>

                </div>
                </div>
                }>
                    {el}
                </Popover>
            }
            items.push(el);
        }
        return <div className='floor' key={f}>{items}</div>;
    }
    return (
        <WidgetWrapper> 
            
            <TitleBar  title='HOTEL OCCUPANCY TREND'  icon="https://static.iviva.com/images/uxp-generic-widgets/concierge%20bell.svg">
            
                
                <div className="rht-title-section"> 

                    <Select
                        selected={selected}
                        options={[
                            { label: "PULLMAN", value: "op-1" },
                            { label: "RUA AL", value: "op-2" },
                        ]}
                        onChange={(value) => { setSelected(value) }}
                        placeholder=" -- select --"
                        isValid={selected ? selected?.length > 0 : null}
                    /> 

                </div>

            </TitleBar> 

                <div className='legend'>
                    <div className='item'>
                        <div className='txt'>Unoccupied</div>
                        <div className='room no-occupancy'><div className='cell'></div></div>
                    </div>
                    <div className='item'>
                        <div className='txt'>Good Comfort</div>
                        <div className='room normal'><div className='cell'></div></div>
                    </div>
                    {/* <div className='item'>
                        <div className='txt'>Medium Comfort</div>
                        <div className='room medium'><div className='cell'></div></div>
                    </div> */}
                    <div className='item'>
                        <div className='txt'>Poor Comfort</div>
                        <div className='room high'><div className='cell'></div></div>
                    </div>
                    <div className='item' style={{marginRight:"0"}}>
                        <div className='txt'>Under Maintenance</div>
                        <div className='room maintenance  maintenance1'><div className='cell'></div></div>
                    </div>
                    <div className='item  settings'> 
                        <div className='room settings1'></div>
                    </div>
                </div>
                <div className='hotel-map'>
                    {floorItems}
                </div>
                
                <Modal show={showRT} onClose={()=>setShowRT(false)}>
                    <iframe src='http://ivivaanywhere.ivivacloud.com/Apps/IBMS/demo-rt.json?key=6' width='100%' height='100%' frameBorder='0'></iframe>
                </Modal>
  
        </WidgetWrapper>
    )
};





/**
 * Register as a Widget
 */
registerWidget({
    id: "Hotels_Booking",
    widget: Hotels_BookingWidget,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});

/**
 * Register as a Sidebar Link
 */
/*
registerLink({
    id: "Hotels_Booking",
    label: "Hotels_Booking",
    // click: () => alert("Hello"),
    component: Hotels_BookingWidget
});
*/

/**
 * Register as a UI
 */

 /*
registerUI({
    id:"Hotels_Booking",
    component: Hotels_BookingWidget
});
*/