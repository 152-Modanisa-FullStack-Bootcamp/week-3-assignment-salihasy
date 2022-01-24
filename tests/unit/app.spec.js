import App from '@/App.vue'
import {createLocalVue, mount} from '@vue/test-utils'
import Vuex from 'vuex'
import {state,getters} from '@/store'

describe("App.vue", () => {

    // function for mount
    function mountComponent() {   
           // create local vue instance
        const localVue = createLocalVue();
        localVue.use(Vuex)

        return mount(App, {
            localVue,
            store: new Vuex.Store({
                         // this state not change real state , reset state for each test
                state : JSON.parse(JSON.stringify(state)), 
                getters
            })
        })
    }

    // beforeEach runs before each test
    let wrapper 
    beforeEach(() => {
        wrapper = mountComponent()
    })
    
    // if the component is not found this will return false, and test will fail
    it('component exists check', () => { 
        expect(wrapper.exists()).toBeTruthy();
    })

        // if the h1 element is not found this will return false, and test will fail
    it('h1 element exists check', () => {
        expect(wrapper.find("h1").exists()).toBeTruthy();
    })

        // check the text of the h1 element and check it is equal to "Daily Corona Cases in Turkey".
    it('h1 element text equal to', () => {
        expect(wrapper.find("h1").text()).toEqual("Daily Corona Cases in Turkey");
    })

    // this test check div class by countValue tests case
    it.each`
        caseName | countValue | expectedStyle
    ${'when count equal to 11'} | ${11} | ${"danger"}
    ${'when count equal to 7'} | ${7} | ${"normal"}
    ${'when count equal to 4'} | ${4} | ${"safe"}
    `('returns $expectedStyle when $caseName with $countValue',
    async ({caseName, countValue, expectedStyle}) => {
        // countValues of the test cases assign to count of state
        wrapper.vm.$store.state.count = countValue
        await wrapper.vm.$nextTick()
        // find element get by class name
        const element = wrapper.find(".notificationArea")
        expect(element.classes()).toContain(expectedStyle)
    });


     // this test check div message by countValue
    it("notification area message check", async() => {
        const countValue = 15
        const localThis = {
            $store : {
                state : {
                    count : countValue
                }
            }
        }
        const returned = App.computed.message.call(localThis)
        wrapper.vm.$store.state.count = countValue
        await wrapper.vm.$nextTick()
        expect(wrapper.find(".notificationArea").text()).toEqual(returned)
        wrapper.vm.$store.state.count = 3
        await wrapper.vm.$nextTick()
    })
})
