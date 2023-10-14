import { describe, it, expect, test, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '../HomeView.vue';

describe('HomeView.vue', () => {
  let wrapper;

  //console.log(wrapper.html())

  beforeEach(() => {
    wrapper = mount(HomeView);
  });

  it('mounts the component Homeview', () => {
    expect(mount(HomeView)).toBeTruthy();
  })


  it('renders a header form in HomeView', () => {
    const header = wrapper.get('form [data-test="header"]');
    expect(header.text()).toContain('Contact Form');
  })

  // 1. div.error-message when empty input name & click Submit
  test('gives empty name', async () => {
    const emptyName = '';
    const nameInput = wrapper.find('[data-test="new-name"] input');
    expect(nameInput.text()).toContain('');

    await nameInput.setValue(emptyName);
    expect(nameInput.element.value).toBe('');

    await wrapper.get('[data-test="form"]').trigger('submit');

    expect(wrapper.get('[data-test="new-name"] .error-message'));
  })

  // 2. div.error-message when input name value length < 5 & click Submit (validateName)

  // 3. div.error-message when input name value length > 50 & click Submit (validateName)

  // 4. div.error-message when input name value is number & click Submit (validateName)

  // 5. div.error-message when empty input email & click Submit

  // 6. div.error-message when wrong format of input email & click w Submit (validateEmail)

  // 7. div.error-message when empty input message & click Submit

  // 8. div.error-message when input message value length > 500 & click w Submit

  // 9. no div.error-message when empty input  subject & click w Submit

  // 10. div.error-message when input subject value > 100 & click w Submit

  // 11. any of div.error-message when all required input values & click w Submit

  // 12. any of div.error-message when (requied && subject) input values & click w Submit
  it('should submit the form when the submit button is clicked', async () => {
    const name = 'Testowy Anonim';
    const email = 'testowy.anonim@domain.com';
    const subject = 'Test';
    const message = 'This is a long text message to send by me. This is a long text message to send by me';

    const nameInput = wrapper.find('[data-test="new-name"] input');
    // input renders with an empty value
    expect(nameInput.text()).toContain('');

    await nameInput.setValue(name);
    // Check the input has correct value
    expect(nameInput.element.value).toBe('Testowy Anonim');

    const emailInput = wrapper.find('[data-test="new-email"] input');
    expect(emailInput.text()).toContain('');
    await emailInput.setValue(email);
    expect(emailInput.element.value).toBe('testowy.anonim@domain.com');

    const subjectInput = wrapper.find('[data-test="new-subject"] input');
    expect(subjectInput.text()).toContain('');
    await subjectInput.setValue(subject);
    expect(subjectInput.element.value).toBe('Test');

    const messageText = wrapper.find('[data-test="new-message"] textarea');
    expect(messageText.text()).toContain('');
    await messageText.setValue(message);
    expect(messageText.element.value).toBe(message);

    const submitForm = wrapper.find('form[data-test="form"]');
    const spyOnForm = vi.spyOn(submitForm, 'trigger')
    await submitForm.trigger('submit.prevent');
    expect(spyOnForm).toHaveBeenCalledOnce();

    expect(submitForm.find('.error-message').exists()).toBe(false);
  })

  // 13. the success notification should be shown when http mock & POST success is true
  test('renders a success toast', () => {
    const wrapper = mount(HomeView, {
      global: {
        mocks: {
          success: true
        }
      }
    })

  expect(wrapper.find('#success').exists()).toBe(true);
  expect(wrapper.get('#success h3').text()).toEqual('Your message has been sent successfully');
  //console.log(wrapper.get('#success h3').html())
})

  // 14. the error notification when http mock & POST errorThrow.state is true

  // 15. loader when isLoading jest true

  // 16. remaining input values when errorThrow.state is true

  // 17. no input values when success is true

})