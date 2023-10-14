import { describe, it, expect, test, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import HomeView from '../HomeView.vue';

describe('HomeView.vue', () => {
  let wrapper;
  let nameInput;
  let emailInput;
  let subjectInput;
  let messageText;
  const minLengthName = 5;
  const maxLengthName = 50;
  const maxLengthSubject = 100;
  const maxLengthMessage = 500;

  beforeEach(() => {
    wrapper = mount(HomeView);

    nameInput = wrapper.find('[data-test="new-name"] input');
    emailInput = wrapper.find('[data-test="new-email"] input');
    subjectInput = wrapper.find('[data-test="new-subject"] input');
    messageText = wrapper.find('[data-test="new-message"] textarea');
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

    expect(nameInput.text()).toContain('');

    await nameInput.setValue(emptyName);
    expect(nameInput.element.value).toBe('');

    await wrapper.get('[data-test="form"]').trigger('submit.prevent');

    expect(wrapper.get('[data-test="new-name"] .error-message'));
    expect(wrapper.get('[data-test="new-name"] .error-message').text()).toContain('Required field');
  })

  // 2. div.error-message when input name value length < 5 & click Submit (validateName)
  test('gives too short name', async () => {
    const shortName = 'Evan';

    expect(nameInput.text()).toContain('');

    await nameInput.setValue(shortName);
    expect(nameInput.element.value).toBe(shortName);

    await wrapper.get('[data-test="form"]').trigger('submit.prevent');

    expect(wrapper.get('[data-test="new-name"] .error-message'));
    expect(wrapper.get('[data-test="new-name"] .error-message').text()).toContain(`Name must be at least ${minLengthName}`);
  })

  // 3. div.error-message when input name value length > 50 & click Submit (validateName)
  test('gives too long name', async () => {
    const longName = 'EvanYou EvanYou EvanYou EvanYou EvanYou EvanYou EvanYour ';

    expect(nameInput.text()).toContain('');

    await nameInput.setValue(longName);
    expect(nameInput.element.value).toBe(longName);

    await wrapper.get('[data-test="form"]').trigger('submit.prevent');

    expect(wrapper.get('[data-test="new-name"] .error-message'));
    expect(wrapper.get('[data-test="new-name"] .error-message').text()).toContain(`Name must be maximum ${maxLengthName}`);
  })

  // 4. div.error-message when input name value is number & click Submit (validateName)
  test('gives wrong name', async () => {
    const wrongName = '123Anonimowy';
    const nameInput = wrapper.getComponent('[data-test="new-name"]');
    expect(nameInput.get('[data-test="new-name"] input').text()).toEqual('');

    await wrapper.findComponent('[data-test="new-name"]').setValue(wrongName);
    expect(wrapper.find('[data-test="new-name"] input').element.value).toBe(wrongName);

    await wrapper.get('[data-test="form"]').trigger('submit.prevent');
    expect(nameInput.get('[data-test="new-name"] div').classes()).toContain('error-message');
    expect(nameInput.get('[data-test="new-name"] div').text()).toEqual('Invalid name. Name can contain letters and cannot contain numbers');
  })

  // 5. div.error-message when empty input email & click Submit
  test('gives empty email', async () => {
    const emptyEmail = '';

    expect(emailInput.text()).toContain('');

    await emailInput.setValue(emptyEmail);
    expect(emailInput.element.value).toBe('');

    await wrapper.get('[data-test="form"]').trigger('submit.prevent');

    expect(wrapper.get('[data-test="new-email"] .error-message'));
    expect(wrapper.get('[data-test="new-email"] .error-message').text()).toContain('Required field');
  })

  // 6. div.error-message when wrong format of input email & click Submit (validateEmail)
  test('enters invalid email', async () => {
    const invalidEmail = 'www.google.com';

    expect(emailInput.text()).toContain('');

    await emailInput.setValue(invalidEmail);
    expect(emailInput.element.value).toBe(invalidEmail);

    await wrapper.get('[data-test="form"]').trigger('submit.prevent');

    expect(wrapper.get('[data-test="new-email"] .error-message'));
    expect(wrapper.get('[data-test="new-email"] .error-message').text()).toContain('Invalid email address');
  })

  // 7. div.error-message when empty input message & click Submit
  test('gives empty message', async () => {
    const emptyMessage = '';

    expect(messageText.text()).toContain('');

    await messageText.setValue(emptyMessage);
    expect(messageText.element.value).toBe('');

    await wrapper.get('[data-test="form"]').trigger('submit.prevent');

    expect(wrapper.get('[data-test="new-message"] .error-message'));
    expect(wrapper.get('[data-test="new-message"] .error-message').text()).toContain('This field cannot be empty');
  })

  // 8. div.error-message when input message value length > 500 & click Submit
  test('enters too long message', async () => {
    const longMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    expect(messageText.text()).toContain('');

    await messageText.setValue(longMessage);
    expect(messageText.element.value).toBe(longMessage);

    await wrapper.get('[data-test="form"]').trigger('submit.prevent');

    expect(wrapper.get('[data-test="new-message"] .error-message'));
    expect(wrapper.get('[data-test="new-message"] .error-message').text()).toContain(`Message must be maximum ${maxLengthMessage}`);
  })

  // 9. SUCCESS no div.error-message when empty input subject & click Submit
  test('enters empty subject', async () => {
    const emptySubject = '';

    expect(subjectInput.text()).toContain('');

    await subjectInput.setValue(emptySubject);
    expect(subjectInput.element.value).toBe('');

    await wrapper.get('[data-test="form"]').trigger('submit.prevent');

    expect(wrapper.find('[data-test="new-subject"] .error-message').exists()).toBe(false);
  })

  // 10. div.error-message when input subject value > 100 & click Submit
  test('enters too long subject', async () => {
    const longSubject = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

    expect(subjectInput.text()).toContain('');

    await subjectInput.setValue(longSubject);
    expect(subjectInput.element.value).toBe(longSubject);

    await wrapper.get('[data-test="form"]').trigger('submit.prevent');

    expect(wrapper.get('[data-test="new-subject"] .error-message'));
    expect(wrapper.get('[data-test="new-subject"] .error-message').text()).toContain(`Subject must be maximum ${maxLengthSubject}`);
  })

  // 11. SUCCESS: any of div.error-message when all required (no subject) input values & click Submit

  // 12. SUCCESS: any of div.error-message when (requied && subject) input values & click Submit
  it('should submit the form when all fields valid and the submit button is clicked', async () => {
    const name = 'Testowy Anonim';
    const email = 'testowy.anonim@domain.com';
    const subject = 'Test';
    const message = 'This is a long text message to send by me. This is a long text message to send by me';

    expect(nameInput.text()).toContain('');
    await nameInput.setValue(name);
    expect(nameInput.element.value).toBe('Testowy Anonim');

    expect(emailInput.text()).toContain('');
    await emailInput.setValue(email);
    expect(emailInput.element.value).toBe('testowy.anonim@domain.com');

    expect(subjectInput.text()).toContain('');
    await subjectInput.setValue(subject);
    expect(subjectInput.element.value).toBe('Test');

    expect(messageText.text()).toContain('');
    await messageText.setValue(message);
    expect(messageText.element.value).toBe(message);

    const submitForm = wrapper.find('form[data-test="form"]');
    const spyOnForm = vi.spyOn(submitForm, 'trigger');
    await submitForm.trigger('submit.prevent');
    expect(spyOnForm).toHaveBeenCalledOnce();

    expect(submitForm.find('.error-message').exists()).toBe(false);
  })

  // 13. the success notification should be shown when success is true
  test('renders a success toast', () => {
    const wrapper = mount(HomeView, {
      global: {
        mocks: {
          success: true
        }
      }
    });

    expect(wrapper.find('#success').exists()).toBe(true);
    expect(wrapper.get('#success h3').text()).toEqual('Your message has been sent successfully');
  })

  // 14. the error notification when errorThrow.state is true
  test('renders an error toast', () => {
    const wrapper = mount(HomeView, {
      global: {
        mocks: {
          errorThrow: {
            state: true
          }
        }
      }
    });
    expect(wrapper.find('.toast-error').exists()).toBe(true);
  })

  // 15. loader when isLoading jest true
  test('renders a loader', () => {
    const wrapper = mount(HomeView, {
      global: {
        mocks: {
          isLoading: true
        }
      }
    })

    expect(wrapper.find('.loader').exists()).toBe(true);
  })
})