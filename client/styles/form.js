import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  header: {
    marginTop: 22,
    marginBottom: 8,
    fontSize: 20
  },
  form: {
    marginHorizontal: 20
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
  percentageInput: {
    marginLeft: 10
  },
  add: {
    marginTop: 10,
    alignItems: 'flex-end'
  }
})
