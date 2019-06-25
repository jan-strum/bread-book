import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    borderColor: '#bbb',
    borderWidth: StyleSheet.hairlineWidth
  },
  notEditing: {
    marginBottom: 20
  },
  tableHeader: {
    marginTop: 25,
    marginLeft: 20,
    fontSize: 20
  },
  edit: {
    textAlign: 'right',
    marginBottom: 10,
    marginRight: 22,
    color: 'gray'
  },
  head: {
    backgroundColor: '#f6f6f6',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between'
  },
  bold: { fontWeight: '500' }
})

export default styles
