import {test,expect} from '@playwright/test'
import { request } from 'http'

test('this is the testapi from playwright',async({request})=>{

    const response = await request.post('url',{

        headers:{
            
        }
    })
})

