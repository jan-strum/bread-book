import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  formHeader: {
    marginTop: 22,
    marginBottom: 8,
    fontSize: 20
  },
  field: {
    marginVertical: 5,
    marginHorizontal: 20,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  label: {
    fontWeight: '500'
  },
  text: {
    marginTop: 3,
    marginBottom: 7
  },
  buttonContainer: {
    flexDirection: 'row'
  },
  button: {
    marginBottom: 7,
    marginRight: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 7
  },
  selectedButton: {
    backgroundColor: '#C8C8C8'
  },
  selectedButtonText: {
    color: 'white'
  },
  percentage: {
    flexDirection: 'row',
    paddingVertical: 7
  },
  other: {
    marginLeft: 10
  },
  submit: {
    marginTop: 10,
    alignItems: 'flex-end'
  },
  submitText: {
    fontSize: 18,
    marginBottom: 20
  }
})
