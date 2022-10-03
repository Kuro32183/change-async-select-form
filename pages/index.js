/* eslint-disable jsx-a11y/alt-text */
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from 'react';

import { Formik, Form as FormikForm, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import {
    Form,
    FormGroup,
    Label,
    Input,
    FormFeedback,
  Button,
} from 'reactstrap';


const categories = [
    { name: '選択してください', value: '選択してください' },
    { name: 'バッグ', value: 'バッグ' },
    { name: 'がま口', value: 'がま口' },
    { name: '小物', value: '小物' },
    { name: 'その他', value: 'その他' },
];

const items = [
  { categorie: '選択してください', name: '選択してください', value: '選択してください' },

  { categorie: 'バッグ', name: 'トートバッグ', value: 'トートバッグ', price: '2500' },
  { categorie: 'バッグ', name: 'ショルダーバッグ', value: 'ショルダーバッグ', price: '3000' },
  { categorie: 'バッグ', name: 'がま口バッグ', value: 'がま口バッグ', price: '5000' },
  { categorie: 'バッグ', name: 'その他', value: 'その他', price: '' },

  { categorie: 'がま口', name: 'シンプルがま口', value: 'シンプルがま口', price: '500' },
  { categorie: 'がま口', name: 'がま口バッグ', value: 'がま口バッグ', price: '5000' },
  { categorie: 'がま口', name: 'その他', value: 'その他', price: '' },

  { categorie: '小物', name: '小銭くるくる', value: '小銭くるくる', price: '1700' },

  { categorie: 'その他', name: 'エプロン', value: 'エプロン', price: '6000' },
  { categorie: 'その他', name: 'その他', value: 'その他', price: '' },
]

const Home = () => {
  const handleSubmit = (values) => {
    alert(JSON.stringify(values));
  }

  return (
    <div className="container">
      <h4 className="my-4">オーダーフォーム</h4>
        <Formik
            initialValues={{ categorie: '選択してください', item: '選択してください' }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={Yup.object().shape({
                categorie: Yup.string().required(['選択してください']),
                // item: Yup.string().notOneOf(['選択してください']),
            })}
        >
            {
                ({ handleSubmit, handleChange, handleBlur, values, price, errors, touched }) => (
                  <Form onSubmit={handleSubmit}>
                   
                        <FormGroup>
                            <Label>商品カテゴリー</Label>
                            <Input
                                type="select"
                                name="categorie"
                                value={values.categorie}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                invalid={Boolean(touched.categorie && errors.categorie)}
                            >
                                {
                                    categories.map((categorie, index) => (
                                        <option value={categorie.value} key={index}>{categorie.name}</option>
                                    ))
                                }
                            </Input>
                            <FormFeedback>{errors.categorie}</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label>商品名</Label>
                            <Input
                                type="select"
                                name="item"
                                value={values.item}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                invalid={Boolean(touched.item && errors.item)}
                            >
                                {
                                    (items.filter(item => item.categorie === values.categorie || item.categorie === '選択してください')).map((item, index) => (
                                      <option value={item.value} key={index}>{item.name}</option>
                                    ))
                                }
                            </Input>
                            {/* <FormFeedback>{errors.item}</FormFeedback> */}
                    </FormGroup>
                    <FormGroup row>
                       <Label>備考</Label>
                        <Input type="textarea" name="text" id="exampleText" onChange={handleChange} onBlur={handleBlur} />
                     </FormGroup>
                        <div>
                            <Button type="submit" color="primary">登録</Button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    </div>
);
}

export default Home