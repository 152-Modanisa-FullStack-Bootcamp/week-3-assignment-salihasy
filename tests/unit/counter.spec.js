import Counter from '@/Counter.vue'
import {createLocalVue, mount} from '@vue/test-utils'
import Vuex from 'vuex'
import {state,getters,mutations,actions} from '@/store'


describe("Counter.vue", () => {

        // function for mount
    function mountComponent() {
        // created local vue instance
        const localVue = createLocalVue();
        localVue.use(Vuex)
        return mount(Counter, {
            localVue,
            store: new Vuex.Store({
                    // this state not change real state , reset state for each test
                state : JSON.parse(JSON.stringify(state)),
                getters,
                mutations,
                actions
            })
        })
    }
    
        // if the component is not found this will return false, and test will fail
    it('component exists check', () => {
        const wrapper = mountComponent()
        expect(wrapper.exists()).toBeTruthy();
    })

        // if the second button is not found this will return false, and test will fail, the second button text is "Increase"
    it('increase exists check', () => {
        const wrapper = mountComponent()
        let a = wrapper.findAll('button').at(1)
        expect(a.exists()).toBeTruthy()
    })

        // if the first button is not found this will return false, and test will fail, the first button text is "Decrease"
    it('decrease exists check', () => {
        const wrapper = mountComponent()
        let a = wrapper.findAll('button').at(0)
        expect(a.exists()).toBeTruthy()
    })

        //  this test checks the dispatch when click on the decrease button
    it('decrease button functionality check',() => {
        const dispatchMock = jest.fn()
        const wrapper = mount(Counter, {
            mocks : {
                $store : {
                    state,
                    dispatch : dispatchMock
                }
            }
        })

        let button = wrapper.findAll('button').at(0)
        button.trigger('click')
        expect(dispatchMock).toHaveBeenCalledWith('decrement')

    })

        //  this test checks the dispatch when click on the increase button
    it('increase button functionality check',() => {
        const dispatchMock = jest.fn()
        const wrapper = mount(Counter, {
            mocks : {
                $store : {
                    state,
                    dispatch : dispatchMock
                }
            }
        })

        let button = wrapper.findAll('button').at(1)
        button.trigger('click')
        expect(dispatchMock).toHaveBeenCalledWith('increment')

    })

    // check the status of the state's count based on the number of clicks on the buttons

    it('2 increase + decrease functionality check together',async() => {
        const wrapper = mountComponent()
        const afterCount = 1 // -2 + 1 = 1, we expect that the count value is 2
        let button1 = wrapper.findAll('button').at(1) // increase button
        let button2 = wrapper.findAll('button').at(0) // decrease button

        // 2 increase
        button1.trigger('click')
        button1.trigger('click')

        // 1 decrease
        button2.trigger('click')

        //  nextTick accepts a callback function that gets delayed until the next DOM update cycle
        await wrapper.vm.$nextTick()

        expect(wrapper.vm.$store.state.count).toEqual(afterCount)
    })

    it('count text show check',async() => {
        const wrapper = mountComponent()
        // find the text of the h1 element and check it is equal to state count
        expect(wrapper.vm.$store.state.count + "k").toEqual(wrapper.find('span').text())
    })
})

