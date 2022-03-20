import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser, updateUser } from '../services/userAPI';
import { Loading, Form } from '../components/index1';
import Header from '../components/Header';

const MIN_LENGTH = 3;

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: true,
      isBtnDisabled: true,
      isSubmitted: false,
    };
  }

  componentDidMount() {
    this.getUserfromAPI();
  }

  getUserfromAPI = async () => {
    const user = await getUser();
    this.setState({ user, loading: false },
      () => {
        this.formValidation();
      });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState((prev) => ({
      user: { ...prev.user, [name]: value },
    }),
    () => this.formValidation());
  }

  formValidation = () => {
    const { user: { name, email, image, description } } = this.state;
    const minValidName = name.length >= MIN_LENGTH;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = validEmail.test(email);

    const formInputs = [name, email, image, description];
    const isFilled = formInputs.every((input) => input);

    const isValid = isFilled && minValidName && isValidEmail;

    this.setState({ isBtnDisabled: true });

    if (isValid) {
      this.setState({ isBtnDisabled: false });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { user } = this.state;
    this.setState({ loading: true });
    await updateUser(user);
    this.setState({ isSubmitted: true, loading: false });
  }

  render() {
    const {
      user: { name, email, image, description },
      loading,
      isBtnDisabled,
      isSubmitted,
    } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading /> : (
          <Form
            name={ name }
            email={ email }
            image={ image }
            description={ description }
            handleChange={ this.handleChange }
            handleSubmit={ this.handleSubmit }
            btnDisabled={ isBtnDisabled }
          />
        )}
        {!loading && isSubmitted && <Redirect to="/profile" />}
      </div>
    );
  }
}

export default ProfileEdit;
